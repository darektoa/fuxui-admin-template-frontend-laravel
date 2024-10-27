import './style.css';
import { Breadcrumbs, BreadcrumbItem, Button, Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import { FeatherIcon } from '@/components/Icon';
import { useForm } from '@/hooks';
import { usePage } from '@inertiajs/react';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Menu from '@/components/Menu';
import Visibility from '@/components/Visibility';

function Content()
{
    const [content, setContent] = useState({});
    const { CSRF_TOKEN, contents } = usePage().props;
    const { contentId } = useParams();
    const { handleChange, values } = useForm({
        value: null,
    });

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Content Management</BreadcrumbItem>
                <BreadcrumbItem>Contents</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="shadow-xl">
                <CardHeader className="px-4 flex gap-3">
                    <FeatherIcon.Box className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">Contents</h3>
                        <p className="text-small text-default-500">List of all content management</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-row overflow-visible py-2">
                    <Menu className="w-1/2 max-w-sm rounded-md bg-primary/5">
                        <Menu.Folders
                            data={contents}
                            href={(item) => `/contents/${item?.id}`}
                            isActive={item => item.id == contentId}
                            reload={false}
                            onClick={(event, item) => {
                                setContent(item)
                            }}
                            attributeMaps={{
                                children: 'name',
                                data: 'directories',
                                items: 'contents',
                            }}
                            itemAttributeMaps={{
                                children: 'name',
                            }}
                        />
                    </Menu>
                    <form method="POST" action={`/contents/${contentId}`} className="flex flex-col grow px-4 max-w-md">
                        <div className="flex flex-col mb-4">
                            <h4 className="font-bold text-lg leading-tight">{content?.name}</h4>
                            <small className="text-sm text-slate-400">~{content?.codename}</small>
                        </div>
                        <Visibility hidden={!('value' in content)}>
                            <input type="hidden" name="_method" value="PUT" />
                            <input type="hidden" name="_token" value={CSRF_TOKEN} />
                            <Input
                                className="mb-3"
                                type="text"
                                name="value"
                                label="Value"
                                placeholder="Enter new value"
                                defaultValue={content?.value}
                            />
                            <Button color="primary" type="submit">
                                Button
                            </Button>
                        </Visibility>
                    </form>
                </CardBody>
            </Card>
        </main>
    );
}

export default Content;
