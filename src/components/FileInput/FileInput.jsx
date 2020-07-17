import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

// styles
import './FileInput.scss';
 
const FileInput = ({
    fileName,
    onDrop: dropCallback,
    onRejected: rejectCallback,
    className = '',
    style = {}
}) => {
    const onDrop = useCallback(
        ([ file ]) => {
            dropCallback && dropCallback(file);
        },
        [ dropCallback ]
    );
    const onRejected = useCallback(
        () => {
            rejectCallback && rejectCallback();
        },
        [ rejectCallback ]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropRejected: onRejected,
        onDropAccepted: onDrop,
        multiple: false,
        maxSize: 1e+7,
        accept: [ 'image/*' ]
    });
    
    function getMessage() {
        if (isDragActive) return <p className="message pg-file-dragging">Drop the files here ...</p>;
        if (fileName) return <p className="message pg-file-loaded">{ fileName }</p>;

        return <p className="message pg-file-default">Drop a file here :)</p>;
    }
    
    return (
        <div
            className={`pg-file-input ${className}`}
            style={style}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            { getMessage() }
        </div>
    )
};

FileInput.propTypes = {
    onRejected: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

export default FileInput;