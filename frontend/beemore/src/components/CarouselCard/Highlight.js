function Highlight() {
  return (
    <div>
      <div className="max-w-xs rounded-md shadow-md bg-coolGray-50 text-coolGray-800">
        <img
          src="https://source.unsplash.com/301x301/?random"
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72 bg-coolGray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">
              Donec lectus leo
            </h2>
            <p className="text-coolGray-800">
              Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-pink-600 text-coolGray-50"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Highlight;
