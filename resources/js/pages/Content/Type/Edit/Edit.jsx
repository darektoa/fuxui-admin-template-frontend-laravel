import "./style.css";
import {
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { usePage } from "@inertiajs/react";
import React from "react";

const Edit = () => {
    const { CSRF_TOKEN, contentType } = usePage().props;

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Content Management</BreadcrumbItem>
                <BreadcrumbItem href="/contents/types">Content Type</BreadcrumbItem>
                <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.User className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">
                            CONTENT TYPE EDIT
                        </h3>
                        <p className="text-small text-default-500">
                            Edit a content type
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as={"form"}
                    action={`/contents/types/${contentType?.id}`}
                    method="POST"
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                >
                    <input type="hidden" name="_method" value="PATCH" />
                    <input type="hidden" name="_token" value={CSRF_TOKEN} />

                    <Input
                        isClearable
                        isRequired
                        required
                        type="text"
                        label="Name :"
                        name="name"
                        defaultValue={contentType?.name}
                        variant="flat"
                        placeholder="Enter content type name . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-6 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Type className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Input
                        isClearable
                        type="text"
                        label="Codename :"
                        name="codename"
                        defaultValue={contentType?.codename}
                        variant="flat"
                        placeholder="Enter content type codename . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-6 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Type className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Textarea
                        isClearable
                        label="Description :"
                        name="description"
                        defaultValue={contentType?.description}
                        variant="flat"
                        placeholder="Enter content type description . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-6 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                    />
                    <Button
                        color="primary"
                        type="submit"
                        className="col-span-12"
                    >
                        Edit
                    </Button>
                </CardBody>
            </Card>
        </main>
    );
};

export default Edit;
