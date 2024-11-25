const BusinessCard = (children) => {
  return (
    <div
      onClick={() =>
        children.onClick(children.business.companyName.split(" ").join("_"))
      }
      className="flex items-center w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer"
    >
      {/* Business Image
      <img
        src={children.business.imageUrl || "https://via.placeholder.com/150"}
        alt={children.business.companyName}
        className="w-24 h-24 object-cover rounded-full mr-6 border-2 border-gray-300"
      /> */}

      {/* Business Details */}
      <div className="flex flex-col flex-1">
        <h4 className="text-xl font-semibold text-gray-800">
          {children.business.companyName}
        </h4>
        <p className="text-gray-600 text-sm">{children.business.category}</p>
        <p className="text-gray-700 mt-2">
          {children.business.address}, {children.business.city} -{" "}
          {children.business.zip}
        </p>
        {children.business.website && (
          <a
            href={children.business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mt-2 text-sm hover:underline"
          >
            Visit Website
          </a>
        )}
        {children.business.phone && (
          <p className="text-gray-600 text-sm mt-2">
            📞 {children.business.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
