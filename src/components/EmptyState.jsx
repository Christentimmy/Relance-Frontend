// src/components/EmptyState.jsx
const EmptyState = ({
  icon = '📭',
  title = "Nothing here yet",
  description = "When you have items, they'll appear here.",
  actionText,
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-5xl mb-4 animate-bounce">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;