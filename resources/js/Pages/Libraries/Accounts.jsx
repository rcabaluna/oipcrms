import { DataTable } from "@/Components/libraries/users/DataTable";
import { columns as accountsColumns } from "@/Components/libraries/accounts/AccountsColumns";
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
import { Checkbox } from "@/Components/ui/checkbox"; // Use Checkbox component
import MainSidebar from "@/Layouts/MainSidebar";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Accounts = ({ users, accounts }) => {
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

    const accountForm = useForm({
        userid: "",
        username: "",
        password: "",
        is_active: true,
    });

    // Reset form on modal close
    const resetForm = () => {
        accountForm.reset({
            userid: "",
            username: "",
            password: "",
            is_active: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!accountForm.data.userid || !accountForm.data.username || !accountForm.data.password) {
            alert("Please fill out all required fields.");
            return;
        }
        accountForm.post("/libraries/accounts", {
            onSuccess: () => {
                setIsUserDialogOpen(false);
                resetForm();
            },
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 mt-10 mx-10">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Manage Accounts</h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage user accounts.
                    </p>
                </div>

                {/* Add User Dialog */}
                <Dialog
                    open={isUserDialogOpen}
                    onOpenChange={(open) => {
                        setIsUserDialogOpen(open);
                        if (!open) resetForm();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsUserDialogOpen(true)}>
                            Add User Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            {/* User Selection */}
                            <Label>Name</Label>
                            <Select
                                value={accountForm.data.userid}
                                onValueChange={(value) => accountForm.setData("userid", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a user">
                                        {
                                        users.find((user) => user.userid === accountForm.data.userid)?.firstname || "Select a user"
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

                            {/* Username Field */}
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={accountForm.data.username}
                                onChange={(e) => accountForm.setData("username", e.target.value)}
                                className="col-span-1"
                            />

                            {/* Password Field */}
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={accountForm.data.password}
                                onChange={(e) => accountForm.setData("password", e.target.value)}
                                className="col-span-1"
                            />

                            {/* Is Active Checkbox */}
                            <Label>Is Active</Label>
                            <Checkbox
                                checked={accountForm.data.is_active}
                                onCheckedChange={(checked) => accountForm.setData("is_active", checked)}
                            />

                            {/* Submit Button */}
                            <Button type="submit">Save</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Separator />

            {/* Users Table */}
            <div className="mt-5">
                <DataTable columns={accountsColumns} data={accounts} />
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
