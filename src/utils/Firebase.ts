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
    Timestamp,
    getCountFromServer,
} from 'firebase/firestore'
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_SENDER_ID,
    FIREBASE_STORAGE_BUCKET,
} from './Env'
import { Highlight, Post } from './Types'
import { OFFLINE_MODE, SAMPLE_HIGHLIGHT, SAMPLE_POST } from './Constants'

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

async function getHighlights() {
    if (OFFLINE_MODE) return [SAMPLE_HIGHLIGHT]

    return (await getDocs(highlightCollection).then(
        getDocumentsFromSnapshot,
    )) as Highlight[]
}

async function getHighlightsForUrl(url?: string) {
    if (OFFLINE_MODE) return [SAMPLE_HIGHLIGHT]
    if (!url) return []

    return (await getDocs(
        query(highlightCollection, where('url', '==', url)),
    ).then(getDocumentsFromSnapshot)) as Highlight[]
}

async function getHighlightById(highlightId: string) {
    if (OFFLINE_MODE) return SAMPLE_HIGHLIGHT

    return (
        await getDocs(
            query(highlightCollection, where('id', '==', highlightId)),
        ).then(getDocumentsFromSnapshot)
    )[0] as Highlight
}

async function getTotalLast7Days() {
    if (OFFLINE_MODE) return 1
    const currentTime = new Date()
    const timeCutoff = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate() - 7,
    )
    const highlightsQuery = query(
        highlightCollection,
        where('timestamp', '>', timeCutoff),
    )
    const highlightsSnapshot = await getCountFromServer(highlightsQuery)
    const postsQuery = query(
        postCollection,
        where('timestamp', '>', timeCutoff),
    )
    const postsSnapshot = await getCountFromServer(postsQuery)
    return highlightsSnapshot.data().count + postsSnapshot.data().count
}

async function getPosts() {
    if (OFFLINE_MODE) return [SAMPLE_POST]

    return (await getDocs(postCollection).then(
        getDocumentsFromSnapshot,
    )) as Post[]
}

async function getPostsByHighlightId(highlightId: string) {
    if (OFFLINE_MODE) return [SAMPLE_POST]

    return (await getDocs(
        query(
            postCollection,
            where('highlight', '==', doc(highlightCollection, highlightId)),
        ),
    ).then(getDocumentsFromSnapshot)) as Post[]
}

/**
 * Unpacks response into list of documents
 * @param snapshot QuerySnapshot from Firestore
 * @returns List of documents
 */
function getDocumentsFromSnapshot(snapshot: QuerySnapshot<any, DocumentData>) {
    return snapshot.docs.map((doc) => doc.data())
}

async function addHighlight(highlight: Highlight) {
    if (OFFLINE_MODE) return

    const emptyRef = doc(highlightCollection)
    await setDoc(emptyRef, {
        id: emptyRef.id,
        timestamp: Timestamp.fromDate(new Date()),
        url: highlight.url,
        quote: highlight.quote,
        upvotes: highlight.upvotes,
        downvotes: highlight.downvotes,
    })
}

async function updateHighlight(highlight: Highlight) {
    if (OFFLINE_MODE) return

    await setDoc(doc(highlightCollection, highlight.id), {
        id: highlight.id,
        timestamp: highlight.timestamp,
        url: highlight.url,
        quote: highlight.quote,
        upvotes: highlight.upvotes,
        downvotes: highlight.downvotes,
    })
}

async function addPostToHighlight(highlightId: string, post: Post) {
    if (OFFLINE_MODE) return

    const highlightRef = doc(highlightCollection, highlightId)
    const emptyRef = doc(postCollection)
    await setDoc(emptyRef, {
        id: emptyRef.id,
        highlight: highlightRef,
        timestamp: Timestamp.fromDate(new Date()),
        comment: post.comment,
        sources: post.sources,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
    })
}

async function updatePost(post: Post) {
    if (OFFLINE_MODE) return

    await setDoc(doc(postCollection, post.id), {
        id: post.id,
        highlight: post.highlight,
        timestamp: post.timestamp,
        comment: post.comment,
        sources: post.sources,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
    })
}

export {
    getHighlights,
    getHighlightsForUrl,
    getHighlightById,
    getPosts,
    addPostToHighlight,
    updatePost,
    updateHighlight,
    addHighlight,
    getPostsByHighlightId,
    getTotalLast7Days,
}
