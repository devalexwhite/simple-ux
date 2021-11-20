const DropZone = ({ children, ondragover, ondrop, id, className }) => {
  const ondragoverhandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (ondragover) ondragover(e);
  };

  return (
    <div
      className={className}
      key={id}
      onDragOver={ondragoverhandler}
      onDrop={ondrop}
    >
      {children}
    </div>
  );
};

export { DropZone };
