export default function BookingDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Hotel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience comfort and luxury. Book your perfect stay with us today.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🏨</div>
            <h3 className="font-semibold text-lg mb-2">Luxury Rooms</h3>
            <p className="text-gray-600 text-sm">
              Comfortable and modern accommodations
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-semibold text-lg mb-2">5-Star Service</h3>
            <p className="text-gray-600 text-sm">
              Exceptional hospitality and care
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="font-semibold text-lg mb-2">Prime Location</h3>
            <p className="text-gray-600 text-sm">
              Easy access to local attractions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}