const BASE_URL = "https://hapi.fhir.org/baseR4";

//create
async function createPatient() {
    const patientData = {
        resourceType: 'Patient',
        name: [{family: 'Doe', given: ['John']}],
        gender: "male",
        birthDate: "1980-01-01"
    };

    const res = await fetch(`${BASE_URL}/Patient`, {
    method: "POST",
    headers: { "Content-Type": "application/fhir+json" },
    body: JSON.stringify(patientData)
    });

    const result = await res.json();
    console.log("Created Patient:", result);
}

//read
async function getPatients() {
    const res = await fetch('${BASE_URL}/Patient?family=smith');
    const data = await res.json();
    data.entry?.forEach((e:any) => {
        const n = e.resource.name?.[0];
        console.log('ID: ${e.resource.id}, Name: ${n?.given?.join(" ")} ${n?.family}');
    });
}

//update
async function updatePatient(patientId: string) {
    const updateData = {
        resourceType: "Patient",
        name: [{ family: "Smith", given: ["Anna"]}]
    };
    const res = await fetch('${BASE_URL}/Patient/${patientId}', {
        method: "PUT",
        headers: { "Content-Type": "application/fhir+json"},
        body: JSON.stringify(updateData)
    });
    const result = await res.json();
    console.log("Updated Patient:", result);
}

//delete
async function deletePatient(patientId: string) {
    const res = await fetch('${BASE_URL}/Patient/${patientId}', {method: "DELETE"});
    console.log("Deleted Patient:", res.status);
}

(async () => {
    await createPatient();
    await getPatients();
    await updatePatient('123');
    await deletePatient('123');
})