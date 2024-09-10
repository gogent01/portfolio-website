import GridContainer from '@/components/landing/GridContainer';

function Grid() {
  return (
    <div className="fixed inset-0 opacity-10">
      <GridContainer className="w-full h-full">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="w-full h-full bg-blue-900"></div>
        ))}
      </GridContainer>
    </div>
  );
}

export default Grid;
