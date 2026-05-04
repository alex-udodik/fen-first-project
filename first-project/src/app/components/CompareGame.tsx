'use client';

import { useState } from 'react';

type Show = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
};

export default function CompareGame({ shows }: { shows: Show[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);

    const showA = shows[currentIndex];
    const showB = shows[currentIndex + 1];
    const winner = showA.vote_average > showB.vote_average ? 0 : 1;

    function handleClick(index: number) {
        setSelected(index);
    }

    function handleNext() {
        setCurrentIndex(currentIndex + 2);
        setSelected(null);
    }

    const hasNext = currentIndex + 2 < shows.length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
                {[showA, showB].map((show, index) => (
                    <div
                        key={show.id}
                        onClick={() => handleClick(index)}
                        style={{
                            border: selected !== null && index === winner ? '3px solid green' : 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.title} />
                        <h3>{show.title}</h3>
                        {selected !== null && <p>{show.vote_average}</p>}
                    </div>
                ))}
            </div>

            {selected !== null && hasNext && (
                <button onClick={handleNext} style={{ fontSize: '4rem', padding: '1rem 2rem' }}>Next</button>
            )}
        </div>
    );
}
