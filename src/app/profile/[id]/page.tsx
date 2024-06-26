export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> Profile</h1>
      <hr />
      <p className="text-4xl mt-4">
        Profile Page
        <span className="p-2 ml-2 rounded bg-green-500">{params.id}</span>
      </p>
    </div>
  );
}
