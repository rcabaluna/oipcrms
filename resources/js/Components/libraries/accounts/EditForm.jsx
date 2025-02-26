import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";

const EditForm = ({ accounts, setOpenEdit }) => {
    // Receive setOpenEdit as prop
    const { data, setData, put, errors, processing } = useForm({
        useraccountid: accounts.useraccountid,
        username: accounts.username,
        password: "",
        is_active: accounts.is_active ? 1 : 0,
        useraccess: Array.isArray(accounts.useraccess)
            ? accounts.useraccess
            : accounts.useraccess
            ? accounts.useraccess.split(";")
            : [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("accounts.update", { account: data }), {
            onSuccess: () => {
                setOpenEdit(false); // Close the dialog on successful update
            },
        });
    };

    const handleAccessChange = (access, checked) => {
        setData(
            "useraccess",
            checked
                ? [...data.useraccess, access]
                : data.useraccess.filter((item) => item !== access)
        );
    };

    return (
        <form onSubmit={handleSubmit} className="grid items-start gap-4">
            {/* Username Field */}
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    className="col-span-1 border rounded-md px-3 py-2"
                />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="col-span-1 border rounded-md px-3 py-2"
                />
            </div>

            {/* Is Active Checkbox */}
            <div className="grid gap-2">
                <Label>Is Active</Label>
                <Checkbox
                    checked={data.is_active === 1}
                    onCheckedChange={(checked) =>
                        setData("is_active", checked ? 1 : 0)
                    }
                />
            </div>

            {/* User Access Checkboxes */}
            <div className="grid gap-2">
                <Label>User Access</Label>

                {/* OPCR Checkbox */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={data.useraccess.includes("opcr")}
                        onCheckedChange={(checked) =>
                            handleAccessChange("opcr", checked)
                        }
                    />
                    <Label>OPCR</Label>
                </div>

                {/* IPCR Checkbox */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={data.useraccess.includes("ipcr")}
                        onCheckedChange={(checked) =>
                            handleAccessChange("ipcr", checked)
                        }
                    />
                    <Label>IPCR</Label>
                </div>

                {/* Libraries Checkbox */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={data.useraccess.includes("libraries")}
                        onCheckedChange={(checked) =>
                            handleAccessChange("libraries", checked)
                        }
                    />
                    <Label>Libraries</Label>
                </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-4" disabled={processing}>
                Save
            </Button>
        </form>
    );
};

export default EditForm;
