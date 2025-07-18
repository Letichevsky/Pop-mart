function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Pop-mart Collection
          </h1>
          <p className="text-lg text-gray-600">
            Управляйте своей коллекцией Pop-mart фигурок
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Добро пожаловать!
            </h2>
            <p className="text-gray-600 mb-4">
              Это ваш личный кабинет для управления коллекцией Pop-mart фигурок.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Просмотр коллекции
                </h3>
                <p className="text-sm text-blue-600">
                  Изучите все ваши фигурки
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  Добавить фигурку
                </h3>
                <p className="text-sm text-green-600">
                  Пополните свою коллекцию
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">
                  Статистика
                </h3>
                <p className="text-sm text-purple-600">
                  Анализ вашей коллекции
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
