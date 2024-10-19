export default function MachineDetails({
    machine,
}: Readonly<{ machine: Machine }>) {
    return (
        <div>
            <h1>{machine.name}</h1>
            <p>{machine.description}</p>
        </div>
    );
})