import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface IMashDropzone {
  acceptedFilesChanged: (acceptedFiles: any[]) => void;
}

function MashDropzone({ acceptedFilesChanged }: IMashDropzone) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    acceptedFilesChanged(acceptedFiles)
  }, [acceptedFiles])

  return (
    <section className="border border-dashed border-gray-500 relative">
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
        />
        <div className="text-center p-10 top-0 right-0 left-0 m-auto">
          <h4>
            Drop files anywhere to upload
            <br />
            or
          </h4>
          <p className="">Select Files</p>
        </div>
      </div>
    </section>
  );

  // return (
  // <div className="border border-dashed border-gray-500 relative">
  //   <input
  //     type="file"
  //     multiple
  //     className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
  //   />
  //   <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
  //     <h4>
  //       Drop files anywhere to upload
  //       <br />
  //       or
  //     </h4>
  //     <p className="">Select Files</p>
  //   </div>
  // </div>
  // );
}

export default MashDropzone;
