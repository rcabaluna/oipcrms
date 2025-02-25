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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import { Checkbox } from "@/Components/ui/checkbox"; // Import ShadCN Checkbox
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
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        userForm.post("/libraries/users", {
            onSuccess: () => {
                setIsUserDialogOpen(false);
                userForm.reset();
            },
            onError: (error) => console.log(error),
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 mt-10 mx-10">
            {/* Users Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Manage Users</h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage users.
                    </p>
                </div>
                <Dialog
                    open={isUserDialogOpen}
                    onOpenChange={setIsUserDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsUserDialogOpen(true)}>
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit}
                            className="grid items-start gap-4"
                        >
                            {/* Inline Form */}
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    value={userForm.data.firstname}
                                    onChange={(e) =>
                                        userForm.setData(
                                            "firstname",
                                            e.target.value
                                        )
                                    }
                                    className="col-span-1 border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="middlename">Middle Name</Label>
                                <Input
                                    id="middlename"
                                    value={userForm.data.middlename}
                                    onChange={(e) =>
                                        userForm.setData(
                                            "middlename",
                                            e.target.value
                                        )
                                    }
                                    className="col-span-1 border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    value={userForm.data.lastname}
                                    onChange={(e) =>
                                        userForm.setData(
                                            "lastname",
                                            e.target.value
                                        )
                                    }
                                    className="col-span-1 border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="extension">Extension</Label>
                                <Select
                                    value={userForm.data.extension}
                                    onValueChange={(value) =>
                                        userForm.setData("extension", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Extension" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={null}>
                                            None
                                        </SelectItem>
                                        <SelectItem value="Sr">Sr</SelectItem>
                                        <SelectItem value="Jr">Jr</SelectItem>
                                        <SelectItem value="II">II</SelectItem>
                                        <SelectItem value="III">III</SelectItem>
                                        <SelectItem value="IV">IV</SelectItem>
                                        <SelectItem value="V">V</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    value={userForm.data.position}
                                    onChange={(e) =>
                                        userForm.setData(
                                            "position",
                                            e.target.value
                                        )
                                    }
                                    className="col-span-1 border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Office Name</Label>
                                <Select
                                    value={userForm.data.officecode}
                                    onValueChange={(value) =>
                                        userForm.setData("officecode", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Office" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {group1.map((group) => (
                                            <SelectItem
                                                key={group.group1Code}
                                                value={group.group1Code}
                                            >
                                                {group.group1Name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Division Name</Label>
                                <Select
                                    value={userForm.data.divisioncode}
                                    onValueChange={(value) =>
                                        userForm.setData("divisioncode", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Division" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {group2.map((group) => (
                                            <SelectItem
                                                key={group.group2Code}
                                                value={group.group2Code}
                                            >
                                                {group.group2Name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Unit Name</Label>
                                <Select
                                    value={userForm.data.unitcode}
                                    onValueChange={(value) =>
                                        userForm.setData("unitcode", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {group3.map((group) => (
                                            <SelectItem
                                                key={group.group3Code}
                                                value={group.group3Code}
                                            >
                                                {group.group3Name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Is Head</Label>
                                <Checkbox
                                    id="is_head"
                                    checked={userForm.data.is_head}
                                    onCheckedChange={(checked) =>
                                        userForm.setData("is_head", checked)
                                    }
                                    className="h-4 w-4"
                                />
                            </div>
                            <Button type="submit" className="mt-4">
                                Save
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Separator />
            {/* Users Table */}
            <div className="mt-5">
                <DataTable columns={userColumns} data={users} />
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
