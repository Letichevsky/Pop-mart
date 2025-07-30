import { useDynamicPixel } from "@/hooks/useDynamicPixel";

export const PixelInfo = () => {
  const { isInitialized, getCurrentPixelId, clearPixelId } = useDynamicPixel();

  if (!isInitialized) {
    return (
      <div className="fixed top-4 left-4 bg-yellow-100 p-3 border border-yellow-400 rounded-lg text-sm z-50">
        <strong>Meta Pixel:</strong> Не инициализирован (нет Pixel ID в URL)
        <br />
        <small>Добавьте ?sub_id_12=YOUR_PIXEL_ID к URL</small>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 bg-green-100 p-3 border border-green-400 rounded-lg text-sm z-50">
      <strong>Meta Pixel:</strong> Активен
      <br />
      <small>ID: {getCurrentPixelId()}</small>
      <br />
      <button
        onClick={clearPixelId}
        className="mt-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Очистить
      </button>
    </div>
  );
};
