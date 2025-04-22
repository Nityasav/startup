
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const workflows = [
  {
    name: "Loan Approval Process",
    status: "Running",
    started: "9:32 AM",
    runtime: "1m 30s",
    owner: "Ada Lovelace",
  },
  {
    name: "Customer Onboarding",
    status: "Paused",
    started: "8:45 AM",
    runtime: "4m 05s",
    owner: "Grace Hopper",
  },
  {
    name: "Invoice Processing",
    status: "Completed",
    started: "7:20 AM",
    runtime: "2m 10s",
    owner: "Alan Turing",
  },
];

export default function DashboardWorkflowsSection() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Workflow Status</CardTitle>
        <CardDescription>Current state of running and recent workflows.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((wf, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{wf.name}</TableCell>
                <TableCell>
                  <span className={
                    wf.status === "Running"
                      ? "bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                      : wf.status === "Paused"
                      ? "bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                      : "bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs font-semibold"
                  }>{wf.status}</span>
                </TableCell>
                <TableCell>{wf.started}</TableCell>
                <TableCell>{wf.runtime}</TableCell>
                <TableCell>{wf.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
