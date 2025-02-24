import { DataTable } from "@/Components/libraries/users/DataTable";
import { columns as accountsColumn } from "@/Components/libraries/accounts/AccountsColumns";
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
import { Checkbox } from "@/Components/ui/checkbox";  // Import ShadCN Checkbox
import { Separator } from "@/Components/ui/separator";
import MainSidebar from "@/Layouts/MainSidebar";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

const Accounts = ({ users, accounts }) => {
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const accountForm = useForm({
        username: "",
        password: "",
        is_active: true,
        useraccess: ["opcr", "ipcr", "libraries"],  // Default values for access
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        accountForm.post("/libraries/accounts", {
            onSuccess: () => {
                setIsUserDialogOpen(false);  // Close the dialog
                accountForm.reset();  // Reset the form after successful submission
            },
            onError: (error) => console.log(error)  // Log error if submission fails
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 mt-10 mx-10">
            {/* Users Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Manage User Accounts</h1>
                    <p className="text-sm text-muted-foreground">View and manage user accounts.</p>
                </div>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsUserDialogOpen(true)}>Add User Account</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add User Account</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid items-start gap-4">
                            {/* User Selection */}
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Select
                                    value={accountForm.data.userid}
                                    onValueChange={(value) => accountForm.setData("userid", Number(value))}
                                    className="col-span-1 border rounded-md px-3 py-2"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a user">
                                            {
                                                users.find((user) => user.userid === accountForm.data.userid)
                                                    ? `${users.find((user) => user.userid === accountForm.data.userid).firstname} 
                                ${users.find((user) => user.userid === accountForm.data.userid).middlename
                                                        ? users.find((user) => user.userid === accountForm.data.userid).middlename.charAt(0) + "." : ""} 
                                ${users.find((user) => user.userid === accountForm.data.userid).lastname} 
                                ${users.find((user) => user.userid === accountForm.data.userid).extension || ""}`
                                                    : "Select a user"
                                            }
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem key={user.userid} value={user.userid}>
                                                {`${user.firstname} ${user.middlename ? user.middlename.charAt(0) + "." : ""} ${user.lastname} ${user.extension || ""}`.trim()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Username Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={accountForm.data.username}
                                    onChange={(e) => accountForm.setData("username", e.target.value)}
                                    className="col-span-1 border rounded-md px-3 py-2"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={accountForm.data.password}
                                    onChange={(e) => accountForm.setData("password", e.target.value)}
                                    className="col-span-1 border rounded-md px-3 py-2"
                                />
                            </div>

                            {/* Is Active Checkbox */}
                            <div className="grid gap-2">
                                <Label>Is Active</Label>
                                <Checkbox
                                    checked={accountForm.data.is_active}
                                    onCheckedChange={(checked) => accountForm.setData("is_active", checked)}
                                />
                            </div>

                            {/* User Access Checkboxes */}
                            <div className="grid gap-2">
                                <Label>User Access</Label>

                                {/* OPCR Checkbox */}
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={accountForm.data.useraccess.includes("opcr")}
                                        onCheckedChange={(checked) =>
                                            accountForm.setData("useraccess", checked ? [...accountForm.data.useraccess, "opcr"] : accountForm.data.useraccess.filter((access) => access !== "opcr"))
                                        }
                                    />
                                    <Label>OPCR</Label>
                                </div>

                                {/* IPCR Checkbox */}
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={accountForm.data.useraccess.includes("ipcr")}
                                        onCheckedChange={(checked) =>
                                            accountForm.setData("useraccess", checked ? [...accountForm.data.useraccess, "ipcr"] : accountForm.data.useraccess.filter((access) => access !== "ipcr"))
                                        }
                                    />
                                    <Label>IPCR</Label>
                                </div>

                                {/* LIBRARIES Checkbox */}
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={accountForm.data.useraccess.includes("libraries")}
                                        onCheckedChange={(checked) =>
                                            accountForm.setData("useraccess", checked ? [...accountForm.data.useraccess, "libraries"] : accountForm.data.useraccess.filter((access) => access !== "libraries"))
                                        }
                                    />
                                    <Label>Libraries</Label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="mt-4">Save</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator />
            {/* Users Table */}
            <div className="mt-5">
                <DataTable columns={accountsColumn} data={accounts} />
            </div>
        </div>
    );
};

Accounts.layout = (page) => (
    <MainSidebar blink="Libraries" bpage="Accounts">
        {page}
    </MainSidebar>
);

export default Accounts;
