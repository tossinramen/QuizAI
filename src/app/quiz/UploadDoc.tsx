"use client"; // render on client side not server
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadDoc = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [quizResponse, setQuizResponse] = useState<any>(null); // ✅ Store API response

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!document) {
            setError("Please upload the document first.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("pdf", document);

        try {
            const res = await fetch("/api/quiz/generate", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            console.log("API Response:", data); // ✅ Log API response
            setQuizResponse(data); // ✅ Store response for UI display

        } catch (e: any) {
            console.error("Error while generating quiz:", e);
            setError("Error while generating quiz. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <div className="w-full">
            <form className="w-full" onSubmit={handleSubmit}>
                <label
                    htmlFor="document"
                    className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative"
                >
                    <div className="absolute inset-0 m-auto flex justify-center items-center">
                        {document ? document.name : "Choose a file"}
                    </div>
                    <input
                        type="file"
                        id="document"
                        className="relative block w-full h-full z-50 opacity-0"
                        accept=".pdf"
                        onChange={(e) => setDocument(e?.target?.files?.[0] || null)}
                    />
                </label>

                {error && <p className="text-red-600">{error}</p>}

                <Button size="lg" className="mt-2" type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate Quiz 🚀"}
                </Button>

                {/* ✅ Display Quiz API Response */}
                {quizResponse && (
                    <div className="mt-4 p-4 border rounded bg-gray-100">
                        <h3 className="text-lg font-semibold">Quiz Generated:</h3>
                        <pre className="text-sm">{JSON.stringify(quizResponse, null, 2)}</pre>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UploadDoc;
