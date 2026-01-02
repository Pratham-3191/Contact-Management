import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const ContactList = ({ contacts, onDelete }) => {
    const [deleteMessage, setDeleteMessage] = useState("");
    const [expandedMessages, setExpandedMessages] = useState({});

    if (contacts.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                <p className="text-gray-500">
                    No contacts yet. Add your first contact using the form above.
                </p>
            </div>
        );
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`, {
                method: "DELETE",
            });

            onDelete(id);
            setDeleteMessage("Contact deleted successfully!");

            setTimeout(() => {
                setDeleteMessage("");
            }, 3000);
        } catch (error) {
            console.error("Delete failed", error);
            setDeleteMessage("Failed to delete contact");
            setTimeout(() => {
                setDeleteMessage("");
            }, 3000);
        }
    };

    const toggleMessage = (id) => {
        setExpandedMessages((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderMessage = (contact) => {
        const fullMessage = contact.message || "—";
        const isExpanded = expandedMessages[contact._id || contact.id];
        const shouldTruncate = fullMessage.length > 70;

        if (!shouldTruncate) return fullMessage;

        return (
            <span>
                {isExpanded ? fullMessage : fullMessage.slice(0, 70) + "..."}{" "}
                <button
                    className="text-blue-600 hover:underline text-sm ml-1"
                    onClick={() => toggleMessage(contact._id || contact.id)}
                >
                    {isExpanded ? "Read less" : "Read more"}
                </button>
            </span>
        );
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-gray-900">
                    Contacts ({contacts.length})
                </h2>
                {deleteMessage && (
                    <span className="text-green-600 text-sm">{deleteMessage}</span>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-gray-700">Email</th>
                            <th className="px-6 py-3 text-left text-gray-700">Phone</th>
                            <th className="px-6 py-3 text-left text-gray-700">Message</th>
                            <th className="px-6 py-3 text-right text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {contacts.map((contact) => (
                            <tr
                                key={contact._id || contact.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 text-gray-900">{contact.name}</td>
                                <td className="px-6 py-4 text-gray-600 max-w-72 wrap-break-words">
                                    {contact.email || "—"}
                                </td>

                                <td className="px-6 py-4 text-gray-600">{contact.phone}</td>
                                <td className="px-6 py-4 text-gray-600 max-w-75">
                                    {renderMessage(contact)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="inline-flex items-center gap-1.5 text-red-600 cursor-pointer"
                                        aria-label="Delete contact"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="text-sm">Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
                {contacts.map((contact) => (
                    <div key={contact._id || contact.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-gray-900 mb-1">{contact.name}</h3>
                                <p className="text-gray-600 text-sm">{contact.phone}</p>
                            </div>

                            <button
                                onClick={() => handleDelete(contact._id)}
                                className="text-red-600 transition-colors p-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {contact.email && (
                            <p className="text-gray-600 text-sm mb-2 max-w-75 wrap-break-words">
                                {contact.email}
                            </p>

                        )}

                        {contact.message && (
                            <p className="text-gray-500 text-sm">{renderMessage(contact)}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactList;
