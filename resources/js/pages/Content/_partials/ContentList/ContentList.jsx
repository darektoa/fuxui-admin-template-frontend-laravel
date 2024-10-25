import './style.css';
import React from 'react';
import Menu from '@/components/Menu';

function ContentList(props) {
    const { contents, directories} = props;

    return (
        <>
            {directories?.map((content, index) => (
                <Menu.Item
                    key={`content-directory-${content?.id}`}
                    href={'#'}
                    items={content?.directories}
                    itemAttributeMaps={{
                        children: 'name',
                        items: 'directories',
                    }}
                >
                    <Icon.FeatherIcon.Box className="size-5" />
                    {content?.name}
                </Menu.Item>

            ))}

            {contents?.map((content, index) => (
                <Menu.Item
                    key={`content-${content?.id}`}
                    href={'#'}
                    items={content?.directories}
                    itemAttributeMaps={{
                        children: 'name',
                        items: 'contents',
                    }}
                >
                    <Icon.FeatherIcon.Box className="size-5" />
                    {content?.name}
                </Menu.Item>
            ))}
        </>
    );
}

export default ContentList;
