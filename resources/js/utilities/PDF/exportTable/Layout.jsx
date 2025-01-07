import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import isFunction from "@/utilities/isFunction";
import React, {
    Children,
    createContext,
    memo,
    useContext,
    useMemo,
} from "react";

Font.registerHyphenationCallback((word) => {
    return word?.split("") || [];
});

const TableContext = createContext({
    maxColumns: 1,
    setMaxColumns: () => {},
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
    },
    table: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#bfbfbf",
    },
    tableHeading: {
        fontWeight: "bold",
    },
    tableCell: {
        padding: 4,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderStyle: "solid",
        borderRightWidth: 1,
        borderColor: "#bfbfbf",
        fontSize: 10,
    },
    text: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: 1,
        flexBasis: 0,
    },
});

const Layout = ({ data }) => {
    return (
        <Document>
            {data?.map((page, index) => (
                <Page key={index} size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Data Table</Text>
                    </View>

                    <Table>
                        <TableRow>
                            {page?.columns?.map((column) => (
                                <TableCell
                                    key={column.key}
                                    style={styles.tableHeading}
                                >
                                    {column.header}
                                </TableCell>
                            ))}
                        </TableRow>

                        {page?.rows?.map((row, rowIndex) => (
                            <TableRow key={`row-${rowIndex}`}>
                                {page?.columns?.map((column, columnIndex) => (
                                    <TableCell
                                        key={`rowcol-${rowIndex}-${columnIndex}`}
                                    >
                                        {isFunction(page?.maps?.[column?.key])
                                            ? page?.maps[column?.key](row)
                                            : row[column?.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </Table>
                </Page>
            ))}
        </Document>
    );
};

function maxTableRowChildren(children) {
    return Children.toArray(children).reduce((max, child) => {
        if (child.type !== TableRow) return max;
        return Math.max(max, Children.count(child.props.children));
    }, 1);
}

function splitText(string, byLength) {
    const regexp = new RegExp(`.{1,${byLength}}`, "g");
    const result = string.match(regexp) || [];
    return result;
}

export const Table = memo((props) => {
    const { children = "", style = {} } = props;
    console.time('MAX CALCULATE')
    const maxColumns = maxTableRowChildren(children);
    console.timeEnd('MAX CALCULATE');

    return useMemo(
        () => (
            <TableContext.Provider
                value={{
                    maxColumns,
                }}
            >
                <View
                    style={{
                        ...styles.table,
                        ...style,
                    }}
                >
                    {children}
                </View>
            </TableContext.Provider>
        ),
        [children, style]
    );
});

export const TableRow = memo((props) => {
    const { children = "", style = {} } = props;

    return useMemo(
        () => (
            <View
                break
                style={{
                    ...styles.tableRow,
                    ...style,
                }}
            >
                {children}
            </View>
        ),
        [children, style]
    );
});

export const TableCell = memo((props) => {
    const context = useContext(TableContext);
    const { children = "", style = {} } = props;

    return useMemo(
        () => (
            <View
                style={{
                    ...styles.tableCell,
                    width: `${100 / context.maxColumns}%`,
                }}
            >
                <TextWrap style={style}>{children}</TextWrap>
            </View>
        ),
        [children, context.maxColumns, style]
    );
});

export const TextWrap = memo((props) => {
    const { children = "", style = {}, splitByLength = 1 } = props;

    return useMemo(
        () =>
            typeof children === "string" ? (
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                    }}
                >
                    {splitText(children, splitByLength).map((word, index) => (
                        <Text key={`TextWrap-${word}-${index}`} style={style}>
                            {word}
                        </Text>
                    ))}
                </View>
            ) : (
                children
            ),
        [children, style]
    );
});

export default Layout;
