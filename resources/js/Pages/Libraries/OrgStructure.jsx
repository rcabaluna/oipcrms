import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Separator } from "@/Components/ui/separator";
import MainSidebar from "@/Layouts/MainSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { columns as group1Columns } from "@/Components/libraries/org-structure/Group1Columns";
import { columns as group2Columns } from "@/Components/libraries/org-structure/Group2Columns";
import { columns as group3Columns } from "@/Components/libraries/org-structure/Group3Columns";
import { DataTable } from "@/Components/libraries/org-structure/DataTable";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const OrgStructure = ({ group1, group2, group3 }) => {
    const [isOfficeDialogOpen, setIsOfficeDialogOpen] = useState(false);
    const officeForm = useForm({
        officename: "",
        officecode: "",
        group: "group1",
    });

    const divisionForm = useForm({
        officecode: "",
        divisionname: "",
        divisioncode: "",
        group: "group2",
    });

    const unitForm = useForm({
        officecode: "",
        divisioncode: "",
        unitname: "",
        unitcode: "",
        group: "group3",
    });

    const submitOffice = (e) => {
        e.preventDefault();
        officeForm.post("/libraries/org-structure", {
            onSuccess: () => {
                setIsOfficeDialogOpen(false);
                officeForm.reset(); // Reset the office form after success
            },
        });
    };

    const submitDivision = (e) => {
        e.preventDefault();
        divisionForm.post("/libraries/org-structure", {
            onSuccess: () => {
                setIsOfficeDialogOpen(false);
                divisionForm.reset(); // Reset the division form after success
            },
        });
    };

    const submitUnit = (e) => {
        e.preventDefault();
        unitForm.post("/libraries/org-structure", {
            onSuccess: () => {
                setIsOfficeDialogOpen(false);
                unitForm.reset(); // Reset the unit form after success
            },
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 mt-10 mx-10">
            <div className="flex items-center justify-between">
                <div className="page-title">
                    <h1 className="text-xl font-bold">
                        Manage Organizational Structure
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage the office organizational structure.
                    </p>
                </div>
            </div>

            <Separator />
            <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                <Tabs defaultValue="office" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="office">Office</TabsTrigger>
                        <TabsTrigger value="division">Division</TabsTrigger>
                        <TabsTrigger value="unit">Unit</TabsTrigger>
                    </TabsList>
                    {/* Office Tab */}
                    <TabsContent value="office">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Office
                                </h2>
                            </div>
                            <Dialog
                                open={isOfficeDialogOpen}
                                onOpenChange={setIsOfficeDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="ml-auto mt-3">
                                        Add Office
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                        <Dialog
                            open={isOfficeDialogOpen}
                            onOpenChange={setIsOfficeDialogOpen}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Office</DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={submitOffice}
                                    className="grid items-start gap-4 py-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="officename">
                                            Office Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="officename"
                                            value={officeForm.data.officename}
                                            onChange={(e) =>
                                                officeForm.setData(
                                                    "officename",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="officecode">
                                            Office Code
                                        </Label>
                                        <Input
                                            type="text"
                                            id="officecode"
                                            value={officeForm.data.officecode}
                                            onChange={(e) =>
                                                officeForm.setData(
                                                    "officecode",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <Button type="submit">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                <DataTable
                                    columns={group1Columns}
                                    data={group1}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Division Tab */}
                    <TabsContent value="division">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Division
                                </h2>
                            </div>
                            <Dialog
                                open={isOfficeDialogOpen}
                                onOpenChange={setIsOfficeDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="ml-auto mt-3">
                                        Add Division
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                        <Dialog
                            open={isOfficeDialogOpen}
                            onOpenChange={setIsOfficeDialogOpen}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Division</DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={submitDivision}
                                    className="grid items-start gap-4 py-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="officecode">
                                            Office Name
                                        </Label>
                                        <Select
                                            name="officecode"
                                            value={divisionForm.data.officecode}
                                            onValueChange={(value) =>
                                                divisionForm.setData(
                                                    "officecode",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {group1.map((group, index) => {
                                                    return (
                                                        <SelectItem
                                                            key={index}
                                                            value={
                                                                group.group1Code
                                                            }
                                                        >
                                                            {group.group1Name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="divisionname">
                                            Division Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="divisionname"
                                            value={
                                                divisionForm.data.divisionname
                                            }
                                            onChange={(e) =>
                                                divisionForm.setData(
                                                    "divisionname",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="divisioncode">
                                            Division Code
                                        </Label>
                                        <Input
                                            type="text"
                                            id="divisioncode"
                                            value={
                                                divisionForm.data.divisioncode
                                            }
                                            onChange={(e) =>
                                                divisionForm.setData(
                                                    "divisioncode",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <Button type="submit">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                <DataTable
                                    columns={group2Columns}
                                    data={group2}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Unit Tab */}
                    <TabsContent value="unit">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Unit</h2>
                            </div>
                            <Dialog
                                open={isOfficeDialogOpen}
                                onOpenChange={setIsOfficeDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="ml-auto mt-3">
                                        Add Unit
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                        <Dialog
                            open={isOfficeDialogOpen}
                            onOpenChange={setIsOfficeDialogOpen}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Unit</DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={submitUnit}
                                    className="grid items-start gap-4 py-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="officecode">
                                            Office Name
                                        </Label>
                                        <Select
                                            name="officecode"
                                            value={unitForm.data.officecode}
                                            onValueChange={(value) =>
                                                unitForm.setData(
                                                    "officecode",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {group1.map((group, index) => {
                                                    return (
                                                        <SelectItem
                                                            key={index}
                                                            value={
                                                                group.group1Code
                                                            }
                                                        >
                                                            {group.group1Name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="divisioncode">
                                            Division Name
                                        </Label>
                                        <Select
                                            name="divisioncode"
                                            value={unitForm.data.divisioncode}
                                            onValueChange={(value) =>
                                                unitForm.setData(
                                                    "divisioncode",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {group2.map((group, index) => {
                                                    return (
                                                        <SelectItem
                                                            key={index}
                                                            value={
                                                                group.group2Code
                                                            }
                                                        >
                                                            {group.group2Name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="unitname">
                                            Unit Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="unitname"
                                            value={unitForm.data.unitname}
                                            onChange={(e) =>
                                                unitForm.setData(
                                                    "unitname",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="unitcode">
                                            Unit Code
                                        </Label>
                                        <Input
                                            type="text"
                                            id="unitcode"
                                            value={unitForm.data.unitcode}
                                            onChange={(e) =>
                                                unitForm.setData(
                                                    "unitcode",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <Button type="submit">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                <DataTable
                                    columns={group3Columns}
                                    data={group3}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

OrgStructure.layout = (page) => (
    <MainSidebar blink="Libraries" bpage="Organizational Structure">
        {page}
    </MainSidebar>
);

export default OrgStructure;
