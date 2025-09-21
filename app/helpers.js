module.exports.init = function (dust) {
  // Helper for the role badge
  dust.helpers.roleBadge = (params) => {
    const role = params.role;
    const isAdmin = role === 'admin';
    const bgClass = isAdmin
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';

    return `<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${bgClass}">${role}</span>`;
  };

  // Helper for the status badge
  dust.helpers.statusBadge = (params) => {
    const status = params.status;
    const isActive = status === 'active';
    const bgClass = isActive
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-gray-800';

    return `<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${bgClass}">${status}</span>`;
  };

  // Helper for the delete button
  dust.helpers.deleteUser = (params) => {
    const id = params.id;
    return `
      <form method="POST" action="/users/${id}" style="display: inline;">
        <input type="hidden" name="_method" value="DELETE">
        <button 
          type="submit" 
          class="text-red-600 hover:text-red-900 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Supprimer
        </button>
      </form>
    `;
  };
};
