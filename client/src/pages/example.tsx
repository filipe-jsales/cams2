import React from 'react';
import { decrement, increment } from '../store/example';
import { useAppSelector, useAppDispatch } from '../store/hooks';

const ExamplePage: React.FC = () => {

    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default ExamplePage;