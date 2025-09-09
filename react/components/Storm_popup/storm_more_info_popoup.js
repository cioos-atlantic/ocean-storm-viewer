import React from "react";

/**
 * The Popup function creates a modal popup with a title, content, and close button that can be used in
 * a web application.
 * @returns The function `Popup` is returning a JSX structure that consists of a popup container with a
 * title, children content, and a close button. It also includes an overlay that covers the entire
 * screen to create a modal effect. The popup is styled with CSS properties for positioning, background
 * color, box shadow, padding, border radius, and z-index. The close button triggers the `onClose`
 * function when
 */
export default function Popup({ title, children, onClose }) {
    return (
        <>
            <div
                className="popup"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    borderRadius: "8px",
                    zIndex: 1000,
                }}
            >
                <h4>{title}</h4>
                <div>{children}</div>
                <button
                    onClick={onClose}
                    style={{
                        marginTop: "10px",
                        padding: "10px 15px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Close
                </button>
            </div>
            <div
                className="overlay"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                }}
                onClick={onClose}
            />
        </>
    );
}
