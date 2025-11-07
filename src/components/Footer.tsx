export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          Built by{' '}
          <a
            href="https://aaronroy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Aaron Roy
          </a>
          {' '}& Claude AI
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Powered by Anthropic Claude Sonnet 4
        </p>
      </div>
    </footer>
  );
}
