export default function Loading({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-8">
      <Spinner />
    </div>
  );
}

function Spinner() {
  return (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  );
}
