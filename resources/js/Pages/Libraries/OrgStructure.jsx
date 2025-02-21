import { Separator } from "@/Components/ui/separator";
import MainSidebar from "@/Layouts/MainSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { columns } from "@/Components/libraries/org-structure/Group1Columns";
import { DataTable } from "@/Components/libraries/org-structure/DataTable";

const OrgStructure = ({ group1, group2, group3 }) => {
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
                    <TabsContent value="office">
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                {group1.length === 0 ? (
                                    <p className="text-center">No data available</p>
                                ) : (
                                    <DataTable columns={columns} data={group1} />
                                )}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="division">
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                {group3.length === 0 ? (
                                    <p className="text-center">No data available</p>
                                ) : (
                                    <DataTable columns={columns} data={group2} />
                                )}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="unit">
                        <div className="grid auto-rows-min mt-5 gap-4 md:grid-cols-1">
                            <div className="rounded-xl">
                                {group3.length === 0 ? (
                                    <p className="text-center">No data available</p>
                                ) : (
                                    <DataTable columns={columns} data={group2} />
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
