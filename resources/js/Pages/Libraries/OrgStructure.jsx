import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Separator } from "@/Components/ui/separator";
import MainSidebar from "@/Layouts/MainSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { columns as group1Columns } from "@/Components/libraries/org-structure/Group1Columns";
import { columns as group2Columns } from "@/Components/libraries/org-structure/Group2Columns";
import { columns as group3Columns } from "@/Components/libraries/org-structure/Group3Columns";
import { DataTable } from "@/Components/libraries/org-structure/DataTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

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
            },
        });
    };

    const submitDivision = (e) => {
        e.preventDefault();
        divisionForm.post("/libraries/org-structure", {
            onSuccess: () => {
                setIsOfficeDialogOpen(false);
            },
        });
    };

    const submitUnit = (e) => {
        e.preventDefault();
        unitForm.post("/libraries/org-structure", {
            onSuccess: () => {
                setIsOfficeDialogOpen(false);
            },
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-10 mx-10">
            <div className="flex items-center justify-between">
                <div className="page-title">
                    <h1 className="text-xl font-bold">Manage Organizational Structure</h1>
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
                        <Dialog open={isOfficeDialogOpen} onOpenChange={setIsOfficeDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="mt-3" onClick={() => setIsOfficeDialogOpen(true)}>Add Office</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Office</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={submitOffice} className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="officename" className="text-left">
                                            Office Name
                                        </Label>
                                        <input type="hidden" name="group" value={officeForm.data.group} />
                                        <Input
                                            type="text"
                                            id="officename" name="officename"
                                            value={officeForm.data.officename} onChange={(e) => officeForm.setData("officename", e.target.value)}
                                            className="col-span-3"
                                        />

                                        <Label htmlFor="officecode" className="text-left">
                                            Office Code
                                        </Label>
                                        <Input
                                            type="text"
                                            id="officecode" name="officecode"
                                            value={officeForm.data.officecode} onChange={(e) => officeForm.setData("officecode", e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <Button type="submit">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                {group1.length === 0 ? (
                                    <p className="text-center">No data available</p>
                                ) : (
                                    <DataTable columns={group1Columns} data={group1} />
                                )}
                            </div>
                        </div>
                    </TabsContent>
                    {/* Division Tab */}
                    <TabsContent value="division">
                        <Dialog open={isOfficeDialogOpen} onOpenChange={setIsOfficeDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="mt-3" onClick={() => setIsOfficeDialogOpen(true)}>Add Division</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Division</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={submitDivision} className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">

                                        <Label htmlFor="officename" className="text-left">
                                            Office Name
                                        </Label>
                                        <Select name="officecode" value={divisionForm.data.officecode} onValueChange={(value) => divisionForm.setData("officecode", value)}>

                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {group1.map((group, index) => {
                                                    return <SelectItem key={index} value={group.group1Code}>{group.group1Name}</SelectItem>;
                                                })}

                                            </SelectContent>
                                        </Select>

                                        <Label htmlFor="divisionname" className="text-left">
                                            Division Name
                                        </Label>
                                        <input type="hidden" name="group" value={divisionForm.data.group} />
                                        <Input
                                            type="text"
                                            id="divisionname" name="divisionname"
                                            value={divisionForm.data.divisionname} onChange={(e) => divisionForm.setData("divisionname", e.target.value)}
                                            className="col-span-3"
                                        />

                                        <Label htmlFor="divisioncode" className="text-left">
                                            Division Code
                                        </Label>
                                        <Input
                                            type="text"
                                            id="divisioncode" name="divisioncode"
                                            value={divisionForm.data.divisioncode} onChange={(e) => divisionForm.setData("divisioncode", e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <Button type="submit">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                {group2.length === 0 ? (
                                    <p className="text-center">No data available</p>
                                ) : (
                                    <DataTable columns={group2Columns} data={group2} />
                                )}
                            </div>
                        </div>
                    </TabsContent>
                    {/* Unit Tab */}
                    <TabsContent value="unit">
                        <Dialog open={isOfficeDialogOpen} onOpenChange={setIsOfficeDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="mt-3" onClick={() => setIsOfficeDialogOpen(true)}>Add Unit</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Unit</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={submitUnit} className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">

                                        <Label htmlFor="officename" className="text-left">
                                            Office Name
                                        </Label>
                                        <Select name="officecode" value={unitForm.data.officecode} onValueChange={(value) => unitForm.setData("officecode", value)}>

                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {group1.map((group, index) => {
                                                    return <SelectItem key={index} value={group.group1Code}>{group.group1Name}</SelectItem>;
                                                })}

                                            </SelectContent>
                                        </Select>
                                        <Label htmlFor="divisioncode" className="text-left">
                                            Division Name
                                        </Label>
                                        <Select name="divisioncode" value={unitForm.data.divisioncode} onValueChange={(value) => unitForm.setData("divisioncode", value)}>

                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {group2.map((group, index) => {
                                                    return <SelectItem key={index} value={group.group2Code}>{group.group2Name}</SelectItem>;
                                                })}

                                            </SelectContent>
                                        </Select>

                                        <Label htmlFor="divisionname" className="text-left">
                                            Unit Name
                                        </Label>
                                        <input type="hidden" name="group" value={unitForm.data.group} />
                                        <Input
                                            type="text"
                                            id="unitname" name="unitname"
                                            value={unitForm.data.unitname} onChange={(e) => unitForm.setData("unitname", e.target.value)}
                                            className="col-span-3"
                                        />

                                        <Label htmlFor="unitcode" className="text-left">
                                            Unit Code
                                        </Label>
                                        <Input
                                            type="text"
                                            id="unitcode" name="unitcode"
                                            value={unitForm.data.unitcode} onChange={(e) => unitForm.setData("unitcode", e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <Button type="submit">Save</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                {group2.length === 0 ? (
                                    <p className="text-center">No data available</p>
                                ) : (
                                    <DataTable columns={group3Columns} data={group3} />
                                )}
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
