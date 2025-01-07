import "./style.css";
import {
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Image,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { useCamera } from "@/hooks";
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { useNavigate } from "react-router";
import Partial from "./_partials";
import React, { useCallback, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import addFaceFetcher from "./_functions/addFaceFetcher";

const Create = () => {
    const navigate = useNavigate();
    const { CSRF_TOKEN } = usePage().props;
    const { videoRef, image, imageFile, takeSnapshot } = useCamera();
    const { trigger, data, error } = useSWRMutation(
        "/settings/security/face-sign-in",
        addFaceFetcher
    );
    const { control, handleSubmit, register, setValue } = useForm({
        defaultValues: {
            _token: CSRF_TOKEN,
            name: "",
            isActive: 1,
            image: null,
        },
    });

    useEffect(() => {
        setValue("image", imageFile);
    }, [imageFile]);

    const onSubmit = useCallback((data) => {
        const formData = new FormData();

        formData.append("_token", data._token);
        formData.append("name", data.name);
        formData.append("isActive", data.isActive);
        formData.append("image", data.image);
        console.log(data, Array.from(formData));
        trigger(formData);
        setTimeout(() => {
            navigate("/settings/security/face-sign-in");
        }, 1000);
    }, []);

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem href="/settings">Setting</BreadcrumbItem>
                <BreadcrumbItem href="/settings/security">
                    Security
                </BreadcrumbItem>
                <BreadcrumbItem href="/settings/security/face-sign-in">
                    Face Sign In
                </BreadcrumbItem>
                <BreadcrumbItem>Add Face</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.User className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">
                            Add Face
                        </h3>
                        <p className="text-small text-default-500">
                            Add a new face for sign-in
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as="form"
                    action="/settings/security/face-sign-in"
                    method="POST"
                    encType="multipart/form-data"
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input type="hidden" name="_token" value={CSRF_TOKEN} />

                    <Input
                        {...register("name")}
                        isClearable
                        isRequired
                        required
                        type="text"
                        label="Name :"
                        name="name"
                        variant="flat"
                        placeholder="Enter name . . ."
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
                    <Select
                        {...register("isActive")}
                        isClearable
                        isRequired
                        required
                        label="Is Active :"
                        name="isActive"
                        placeholder="Select . . ."
                        labelPlacement="outside"
                        defaultSelectedKeys={["1"]}
                        className="col-span-12 md:col-span-6 w-full"
                        classNames={{
                            trigger: "focus-within:ring-2",
                        }}
                    >
                        <SelectItem key={0} value={0}>
                            Disabled
                        </SelectItem>
                        <SelectItem key={1} value={1}>
                            Active
                        </SelectItem>
                    </Select>
                    <div className="col-span-12 md:col-span-6 w-full">
                        <Partial.CameraPreview
                            ref={videoRef}
                            className="w-full h-60 mb-2 rounded-xl"
                        />
                        <Button
                            color="primary"
                            type="button"
                            className="w-full"
                            onClick={takeSnapshot}
                        >
                            Take a picture
                        </Button>
                    </div>
                    <div className="col-span-12 md:col-span-6 w-full flex items-center justify-center bg-gray-300 relative rounded-xl">
                        <Image
                            alt="Preview Image"
                            src={image}
                            height={280}
                            className="w-full h-full bg-gray-300 rounded-xl object-contain"
                        />
                        <FeatherIcon.Smile className="absolute size-20 text-gray-400" />
                    </div>
                    <Button
                        color="primary"
                        type="submit"
                        className="col-span-12"
                    >
                        Add
                    </Button>
                </CardBody>
            </Card>
        </main>
    );
};

export default Create;
