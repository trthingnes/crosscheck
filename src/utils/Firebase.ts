import { initializeApp } from 'firebase/app'
import {
    doc,
    getFirestore,
    collection,
    getDocs,
    setDoc,
    query,
    where,
    QuerySnapshot,
    DocumentData,
} from 'firebase/firestore'
import { Highlight, Post } from 'utils/Types'
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_SENDER_ID,
    FIREBASE_STORAGE_BUCKET,
} from 'utils/Env'

initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
})

const firestore = getFirestore()
const highlightCollection = collection(firestore, 'Highlight')
const postCollection = collection(firestore, 'Post')

/**
 * Unpacks response into list of documents
 * @param snapshot QuerySnapshot from Firestore
 * @returns List of documents
 */
function getDocumentsFromSnapshot(snapshot: QuerySnapshot<any, DocumentData>) {
    return snapshot.docs.map((doc) => doc.data())
}

async function getHighlights() {
    return (await getDocs(highlightCollection).then(
        getDocumentsFromSnapshot,
    )) as Highlight[]
}

async function getHighlightsForUrl(url: string | undefined) {
    if (!url) return []
    const q = query(highlightCollection, where('url', '==', url)) 
       return (await getDocs(q).then(getDocumentsFromSnapshot)) as Highlight[]
}

async function getPosts() {
    return (await getDocs(postCollection).then(
        getDocumentsFromSnapshot,
    )) as Post[]
}


async function getPostsByHighlight(highlight: string) {
    const docRef = doc(highlightCollection, highlight);
    const q = query(postCollection, where('highlight','==', docRef))
    return (await getDocs(q).then(getDocumentsFromSnapshot)) as Post[]
}

async function addHighlight(highlight: Highlight) {
    const newDocRef = doc(highlightCollection)
    await setDoc(newDocRef, {
        downvotes: highlight.downvotes,
        upvotes: highlight.upvotes,
        quote: highlight.quote,
        url: highlight.url,
        id: newDocRef.id
      });
}


async function updateHighlight(highlight: Highlight) {
    await setDoc( doc(highlightCollection, highlight.id), {
        downvotes: highlight.downvotes,
        upvotes: highlight.upvotes,
        quote: highlight.quote,
        url: highlight.url,
        id: highlight.id
      });
}

async function addPost(highlight: string,post: Post){
    const docRef = doc(highlightCollection, highlight);
    const newDocRef = doc(postCollection)
    await setDoc(newDocRef, {
        downvotes: post.downvotes,
        upvotes: post.upvotes,
        comment: post.comment,
        highlight: docRef,
        sources: post.sources,
        id: newDocRef.id
      });
}

async function updatePost(highlight: string,post: Post){
    await setDoc(doc(postCollection, post.id), {
        downvotes: post.downvotes,
        upvotes: post.upvotes,
        comment: post.comment,
        highlight: post.highlight,
        sources: post.sources,
        id: post.id 
          });
}



export { getHighlights, getHighlightsForUrl, getPosts,addPost,updatePost,updateHighlight,addHighlight,getPostsByHighlight }
