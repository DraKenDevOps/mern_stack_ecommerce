import React from 'react'
import { Skeleton, Card } from 'antd';

const LoadingCard = ({count}) => {

    const loopCard = () => {
        let cards = []
        for(let i=0; i<count; i++){
            cards.push(
                <div className="col-md-3">
                    <Card>
                        <Skeleton active/>
                    </Card>
                </div>
            )
        }
        return cards
    }

    return (
        <>
            <div className="row">
                {loopCard()}
            </div>
        </>
    )
}

export default LoadingCard