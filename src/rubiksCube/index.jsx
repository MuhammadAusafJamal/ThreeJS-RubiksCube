import { useRef } from 'react'
import useEffectOnce from './hooks/useEffectOnce'
import World from './classes/world'

export default function RubiksCube() {
    const canvasRef = useRef();
    // const CSS2DRef = useRef();

    useEffectOnce(() => {
        const initializeWorld = () => {
        //  CSS2DRef
            const world = new World({ canvasRef });
            const renderer = world.init();

            if (!renderer) return;
            return () => {
                renderer.dispose();
            }

        }

        initializeWorld();
    })


    return (
        <>
            <canvas style={{ position: 'absolute' }} ref={canvasRef} />
            {/* <div style={{ position: 'relative', zIndex: 0, pointerEvents: 'none' }} ref={CSS2DRef}>Visit Abu Dhabi or Else</div> */}
        </>
    )

}

