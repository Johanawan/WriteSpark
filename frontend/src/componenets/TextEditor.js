import "./TextEditor.css"

function TextEditor({blogContent}) {
  console.log("display Blog Content")
  return (
    <div className="text-editor-container">
      <div className="text-editor">
      </div>  
      <div className="text-editor-content">
        {/* Output data from Form.js here */}
        {blogContent}
      </div>
    </div>
  );
}

export default TextEditor;
