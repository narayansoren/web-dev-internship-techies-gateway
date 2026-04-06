function getUsers() {
  const users = [
    {
      name: "Itachi Uchiha",
      email: "itachi.uchiha@gmail.com",
      password: "akatsuki777",
      role: "admin",
      phoneNo: "9876504321",
      address: "Hidden Leaf Village, Japan",
    },
    {
      name: "Levi Ackerman",
      email: "levi.ackerman@gmail.com",
      password: "humanitystrong",
      role: "moderator",
      phoneNo: "9123498765",
      address: "Underground City, Paradis",
    },
    {
      name: "Eren Yeager",
      email: "eren.yeager@gmail.com",
      password: "rumbling999",
      role: "user",
      phoneNo: "9988712345",
      address: "Shiganshina District, Paradis",
    },
    {
      name: "Satoru Gojo",
      email: "satoru.gojo@gmail.com",
      password: "limitless666",
      role: "admin",
      phoneNo: "9090934567",
      address: "Tokyo Jujutsu High, Japan",
    },
    {
      name: "Roronoa Zoro",
      email: "roronoa.zoro@gmail.com",
      password: "oni.giri123",
      role: "user",
      phoneNo: "9012376543",
      address: "Shimotsuki Village, East Blue",
    },
  ];

  return users;
}

const users = getUsers();

console.log(users);
