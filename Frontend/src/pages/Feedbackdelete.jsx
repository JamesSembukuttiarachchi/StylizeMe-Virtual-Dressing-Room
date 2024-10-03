import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import headerImage from '../images/Header5.png'; // Importing the header image
import Swal from 'sweetalert2'; // Import SweetAlert2
//Fedback delete
const FeedbackDelete = () => {
  const { feedbackId } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackById = async () => {
      try {
        const docRef = doc(db, "feedback", feedbackId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFeedbackData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchFeedbackById();
  }, [feedbackId]);

  const handleDelete = async () => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "Once deleted, you won't be able to recover this feedback!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "feedback", feedbackId));
          Swal.fire(
            'Deleted!',
            'Feedback has been deleted successfully.',
            'success'
          ).then(() => {
            navigate('/');
          });
        }
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      Swal.fire(
        'Error!',
        'There was an error deleting the feedback. Please try again.',
        'error'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-8">
        <img src={headerImage} alt="Delete Feedback Header" className="w-full" />
      </div>

      {/* Feedback Delete Section */}
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-red-600">Delete Feedback</h2>

        {feedbackData ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-600"><strong>Name:</strong> {feedbackData.userName}</p>
            <p className="text-lg text-gray-600"><strong>Address:</strong> {feedbackData.userAddress}</p>
            <p className="text-lg text-gray-600"><strong>Overall Experience:</strong> {feedbackData.experience}</p>
            <p className="text-lg text-gray-600"><strong>Ease of Use:</strong> {feedbackData.easeOfUse}</p>
            <p className="text-lg text-gray-600"><strong>Pattern Selection:</strong> {feedbackData.patternSelection}</p>
            <p className="text-lg text-gray-600"><strong>Comments:</strong> {feedbackData.comments}</p>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-white bg-red-600 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Feedback
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading feedback data...</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackDelete;
