export default function() {
  return [
    {
      title: "Tasks",
      to: "/tasks",
      htmlBefore: '<i class="material-icons">settings</i>',
      htmlAfter: ""
    },
    {
      title: "Calender",
      to: "/calender",
      htmlBefore: '<i class="material-icons">calendar_today</i>',
      htmlAfter: ""
    },
    {
      title: "Contacts",
      htmlBefore: '<i class="material-icons">contacts</i>',
      to: "/contacts",
    },
    {
      title: "Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile",
    }
  ];
}
