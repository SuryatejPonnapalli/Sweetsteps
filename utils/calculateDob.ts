export default function calculateAge(dobString: string): number {
  console.log(dobString);
  const [year, month, day] = dobString.split("-").map(Number);
  const dob = new Date(year, month - 1, day); // JS months are 0-based
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}
