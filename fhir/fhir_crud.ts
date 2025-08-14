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
    const res = await fetch(`${BASE_URL}/Patient?family=smith`);
    const data = await res.json();
    data.entry?.forEach((e:any) => {
        const n = e.resource.name?.[0];
        console.log(`ID: ${e.resource.id}, Name: ${n?.given?.join(" ")} ${n?.family}`);
    });
}

//update
async function updatePatient(patientId: string) {
    const updateData = {
        resourceType: "Patient",
        name: [{ family: "Smith", given: ["Anna"]}]
    };
    const res = await fetch(`${BASE_URL}/Patient/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/fhir+json"},
        body: JSON.stringify(updateData)
    });
    const result = await res.json();
    console.log("Updated Patient:", result);
}

//delete
async function deletePatient(patientId: string) {
    const res = await fetch(`${BASE_URL}/Patient/${patientId}`, {method: "DELETE"});
    console.log("Deleted Patient:", res.status);
}

(async () => {
    await createPatient();
    await getPatients();
    await updatePatient('123');
    await deletePatient('123');
})


const pantients = [
    { name: [{ given:["Alice"], family: "Smith"}], age: 35, gender: 'male' },
    { name: [{ given:["Bob"], family: "Johnson"}], age: 45, gender: 'female' },
    { name: [{ given:["Charlie"], family: "Brown"}],  age: 30, gender: 'female'},
    { name: [{ given:["David"], family: "Smith"}], age: 25, gender: 'male' },
];

pantients.forEach(p=>{
    const n = p.name[0];
    console.log(`${n.given.join(" ")} ${n.family}`);
});

const filtered = pantients.filter(p=>p.name[0].family === "Smith");
console.log(filtered);

pantients.filter(p=>p.age > 30).forEach(p=>console.log(p.name));

// 2 pasien pertama
pantients.slice(0, 2).forEach(p=>console.log(p.name));

// tambah gender
pantients.forEach(p=>p.gender='male');
console.log(pantients);

pantients.forEach(p=>{
    if (p.age > 30) {
        p.name[0].given.push("Senior");
    } else {
        p.name[0].given.push("Junior");
    }

    if(p.name[0].given[0]=== "Alice") p.name[0].given[0] = "Alicia";
});

const avg = pantients.reduce((sum, p)=>sum + p.age, 0)/pantients.length;
console.log(avg);

const withGender = pantients.filter(p=>p.gender);
console.log(withGender);

pantients.filter(p=>p.name[0].given[0].startsWith("A")).forEach(p=>console.log(p.name[0].given.join(" ")));

const names = pantients.map(p=>p.name[0].given.join(" ")+" "+p.name[0].family);
console.log(names);