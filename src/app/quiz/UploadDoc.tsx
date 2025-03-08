"use client" // render on client side not server
const UploadDoc = () => {
    return(
        <div>
            <form>
<label htmlFor="document"></label>
<input type="file" id="document" />
            </form>
        </div>
    )
}


export default UploadDoc;