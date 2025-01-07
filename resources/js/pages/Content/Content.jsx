import "./style.css";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Card,
    CardHeader,
    CardBody,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { useForm } from "@/hooks";
import { usePage } from "@inertiajs/react";
import { useParams } from "react-router";
import Menu from "@/components/Menu";
import Partial from "./_partials";
import React, { useEffect, useState } from "react";
import isAuthorized from "@/utilities/isAuthorized";
import toDataURL from "@/utilities/toDataURL";
import Permission from "@/components/Permission";
import Section from "@/components/Section";
import Visibility from "@/components/Visibility";

function Content() {
    const [content, setContent] = useState({});
    const [imagePreviewDataURL, setImagePreviewDataURL] = useState(null);
    const {
        CSRF_TOKEN,
        contents,
        content: currentContent,
        userPermissions,
    } = usePage().props;
    const { contentId } = useParams();
    const { handleChange, values, setValues } = useForm({
        value: null,
    });

    useEffect(() => {
        const value = values.value;
        if (value === null || typeof value !== "object") return;

        toDataURL(value).then((val) => {
            setImagePreviewDataURL(val);
        });
    }, [values.value]);

    useEffect(() => {
        setImagePreviewDataURL(null);

        setValues((states) => ({
            ...states,
            value: content?.value,
        }));
    }, [content]);

    useEffect(() => {
        if (contentId) setContent(currentContent);
    }, []);

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Content Management</BreadcrumbItem>
                <BreadcrumbItem>Contents</BreadcrumbItem>
            </Breadcrumbs>

            <Card
                as={Section}
                permissions="01JDKB58YQNTN1HHF0TBKVP68E"
                className="col-span-12 shadow-xl"
            >
                <CardHeader className="w-full pt-6 px-6 flex gap-3">
                    <FeatherIcon.Box className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">
                            Contents
                        </h3>
                        <p className="text-small text-default-500">
                            List of all content management
                        </p>
                    </div>
                </CardHeader>
                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <Menu className="col-span-4 rounded-md bg-primary/5">
                        <Menu.Folders
                            data={contents}
                            href={(item) => `/contents/${item.data?.id}`}
                            reload={false}
                            isActive={(item) => {
                                if (item.data?.id != contentId) return;
                                return true;
                            }}
                            onClick={(event, item) => {
                                setContent(item.data);
                            }}
                            attributeMaps={{
                                children: "name",
                                data: "directories",
                                items: "contents",
                            }}
                            itemAttributeMaps={{
                                children: "name",
                            }}
                        />
                    </Menu>
                    <form
                        method="POST"
                        action={`/contents/${contentId}`}
                        encType="multipart/form-data"
                        className="col-span-8 flex flex-col grow px-4 max-w-md"
                    >
                        <div className="flex flex-col mb-4">
                            <h4 className="font-bold text-lg leading-tight">
                                {content?.name}
                            </h4>
                            <small className="text-sm text-slate-400">
                                {content?.codename}
                            </small>
                        </div>

                        <Visibility hidden={!("value" in content)}>
                            <input type="hidden" name="_method" value="PUT" />
                            <input
                                type="hidden"
                                name="_token"
                                value={CSRF_TOKEN}
                            />
                            <Partial.ContentInput
                                className="mb-3"
                                type={content?.type?.codename}
                                name="value"
                                label={null}
                                placeholder="Enter new value"
                                onChange={handleChange}
                                value={values?.value}
                                isReadOnly={
                                    !isAuthorized(
                                        userPermissions,
                                        "01JDKB58YQNTN1HHF0TBKVP68H"
                                    )
                                }
                                imagePreviewSrc={
                                    imagePreviewDataURL ?? values?.value
                                }
                            />

                            <Permission permissions="01JDKB58YQNTN1HHF0TBKVP68H">
                                <Button color="primary" type="submit">
                                    Update
                                </Button>
                            </Permission>
                        </Visibility>
                    </form>
                </CardBody>
            </Card>
        </main>
    );
}

export default Content;
