import { DataTable } from "@/Components/libraries/users/DataTable";
import { columns as userColumns } from "@/Components/libraries/users/UsersColumns";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import MainSidebar from "@/Layouts/MainSidebar";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Users = ({ users, group1, group2, group3 }) => {
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const userForm = useForm({
        lastname: "",
        firstname: "",
        middlename: "",
        extension: "",
        position: "",
        officecode: "",
        divisioncode: "",
        unitcode: "",
        is_head: false,
        is_active: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        userForm.post("/libraries/users", {
            onSuccess: () => setIsUserDialogOpen(false),
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 mt-10 mx-10">
            {/* Users Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Manage Users</h1>
                    <p className="text-sm text-muted-foreground">View and manage users.</p>
                </div>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsUserDialogOpen(true)}>Add User</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            {/* Inline Form */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    value={userForm.data.firstname}
                                    onChange={(e) => userForm.setData("firstname", e.target.value)}
                                    className="col-span-1"
                                />
                                <Label htmlFor="middlename">Middle Name</Label>
                                <Input
                                    id="middlename"
                                    value={userForm.data.middlename}
                                    onChange={(e) => userForm.setData("middlename", e.target.value)}
                                    className="col-span-1"
                                />
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    value={userForm.data.lastname}
                                    onChange={(e) => userForm.setData("lastname", e.target.value)}
                                    className="col-span-1"
                                />
                                <Label htmlFor="extension">Extension</Label>
                                <select
                                    id="extension"
                                    value={userForm.data.extension}
                                    onChange={(e) => userForm.setData("extension", e.target.value)}
                                    className="col-span-1 border rounded-md px-3 py-2"
                                >
                                    <option value=""></option>
                                    <option value="Sr">Sr</option>
                                    <option value="Jr">Jr</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                    <option value="V">V</option>
                                </select>
                            </div>
                            <Separator/>
                            <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    value={userForm.data.position}
                                    onChange={(e) => userForm.setData("position", e.target.value)}
                                    className="col-span-1"
                                />
                            <Label>Office Name</Label>
                            <Select value={userForm.data.officecode} onValueChange={(value) => userForm.setData("officecode", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Office" />
                                </SelectTrigger>
                                <SelectContent>
                                    {group1.map((group) => (
                                        <SelectItem key={group.group1Code} value={group.group1Code}>{group.group1Name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Label>Division Name</Label>
                            <Select value={userForm.data.divisioncode} onValueChange={(value) => userForm.setData("divisioncode", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Division" />
                                </SelectTrigger>
                                <SelectContent>
                                    {group2.map((group) => (
                                        <SelectItem key={group.group2Code} value={group.group2Code}>{group.group2Name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Label>Unit Name</Label>
                            <Select value={userForm.data.unitcode} onValueChange={(value) => userForm.setData("unitcode", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {group3.map((group) => (
                                        <SelectItem key={group.group3Code} value={group.group3Code}>{group.group3Name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Label>Is Head</Label>
                            <input
                                type="checkbox"
                                checked={userForm.data.is_head}
                                onChange={(e) => userForm.setData("is_head", e.target.checked)}
                                className="h-4 w-4"
                            />
                            <Label>Is Active</Label>
                            <input
                                type="checkbox"
                                checked={userForm.data.is_active}
                                onChange={(e) => userForm.setData("is_active", e.target.checked)}
                                className="h-4 w-4"
                            />
                            <Button type="submit">Save</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator />
            {/* Users Table */}
            <div className="mt-5">
                {users.length === 0 ? (
                    <p className="text-center">No data available</p>
                ) : (
                    <DataTable columns={userColumns} data={users} />
                )}
            </div>
        </div>
    );
};

Users.layout = (page) => (
    <MainSidebar blink="Libraries" bpage="Users">
        {page}
    </MainSidebar>
);

export default Users;
