import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teams = [
  {
    title: "Winson Li",
    description: "aka \"Sonic\"",
    content: "Frontend Developer, UI Desginer",
    footer: "cli245@my.centennialcollege.ca",
  },
  {
    title: "Hong To",
    description: " ",
    content: "I go to school by bus 2",
    footer: "yto3@my.centennialcollege.ca",
  },
  {
    title: "Edmund Tsoi",
    description: " ",
    content: "I go to school by bus 3",
    footer: "htsoi@my.centennialcollege.ca",
  },
  {
    title: "Lin, Chia Yi",
    description: " ",
    content: "I go to school by bus 4",
    footer: "clin122@my.centennialcollege.ca",
  },
  {
    title: "Shih, Feng-Ming",
    description: " ",
    content: "I go to school by bus 5",
    footer: "fshih@my.centennialcollege.ca",
  },
  {
    title: "Pandit, Sambriddhi",
    description: " ",
    content: "I go to school by bus 6",
    footer: "spandi11@my.centennialcollege.ca",
  },
];

function Team() {
  return (
    <div className="container mt-2 grid md:grid-cols-2 md:gap-2 lg:grid-cols-4">
      {teams.map((e) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{e.title}</CardTitle>
              <CardDescription>{e.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{e.content}</p>
            </CardContent>
            <CardFooter>
              <p>{e.footer}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default Team;
