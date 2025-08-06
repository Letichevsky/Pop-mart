import { useMetaPixelContext } from "@/hooks/useMetaPixelContext";

export const MetaPixelTest = () => {
  const { trackEvent, trackViewContent, trackAddToCart } =
    useMetaPixelContext();

  const handleTestViewContent = () => {
    trackViewContent({
      id: 1,
      name: "Test Product",
      category: "Test Category",
      price: 29.99,
    });
    console.log("Meta Pixel: ViewContent event sent");
  };

  const handleTestAddToCart = () => {
    trackAddToCart({
      id: 1,
      name: "Test Product",
      category: "Test Category",
      price: 29.99,
      quantity: 1,
      size: "small",
    });
    console.log("Meta Pixel: AddToCart event sent");
  };

  const handleTestCustomEvent = () => {
    trackEvent("CustomTestEvent", {
      test_parameter: "test_value",
      timestamp: Date.now(),
    });
    console.log("Meta Pixel: CustomTestEvent sent");
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border rounded-lg shadow-lg z-50">
      <h3 className="text-sm font-bold mb-2">Meta Pixel Test</h3>
      <div className="space-y-2">
        <button
          onClick={handleTestViewContent}
          className="block w-full text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Test ViewContent
        </button>
        <button
          onClick={handleTestAddToCart}
          className="block w-full text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Test AddToCart
        </button>
        <button
          onClick={handleTestCustomEvent}
          className="block w-full text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
        >
          Test Custom Event
        </button>
      </div>
    </div>
  );
};
