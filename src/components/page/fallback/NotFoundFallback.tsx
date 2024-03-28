import UploadZone from "../../native/upload/UploadZone";

export default function NotFoundFallback() {
    return (
        <UploadZone>
            <div className="h-full flex flex-col justify-center items-center">
                <h2>Nothing could be found here!</h2>
                <p>Upload some files to get started</p>
            </div>
        </UploadZone>
    )
}