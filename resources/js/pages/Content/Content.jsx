import './style.css';
import {Card, CardHeader, CardBody, Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { usePage } from '@inertiajs/react';
import Icon from '@/components/Icon';
import React from 'react';
import Menu from '@/components/Menu';

function Content()
{
    const { contents } = usePage().props;

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Content Management</BreadcrumbItem>
                <BreadcrumbItem>Contents</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="py-4 shadow-xl">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h3 className="font-bold text-xl">Contents</h3>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Menu>
                        {contents?.map((content, index) => (
                            <Menu.Item
                                key={`content-${content?.id}`}
                                href={'#'}
                                items={[...content?.directories, ...content?.contents]}
                                itemAttributeMaps={{
                                    children: 'name',
                                    items: 'directories',
                                }}
                            >
                                <Icon.FeatherIcon.Box className="size-5" />
                                {content?.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                </CardBody>
            </Card>
        </main>
    );
}

export default Content;
