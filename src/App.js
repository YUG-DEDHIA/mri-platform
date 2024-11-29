import React from 'react';
import Navbar from './components/Navbar';
import VideoReviewContainer from './components/VideoReviewContainer';
import CommentSection from './components/CommentSection';
import ImageAnnotationContainer from './components/ImageAnnotationContainer';
const App = () => {

    return (

        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div>
                        <header className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Medical Case Review #2847</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full">
                                    Orthopedics
                                </span>
                                <br></br>
                                <span className="text-sm text-gray-500">Patient ID: 847392</span>
                            </div>
                        </header>
                        <br></br>
                        <ImageAnnotationContainer/>
                        <div className="mt-4">
                            <CommentSection />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
