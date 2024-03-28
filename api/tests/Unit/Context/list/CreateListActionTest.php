<?php

namespace Tests\Unit\Context\list;

use App\Context\List\DataTransferObject\CreateListData;
use Domain\List\Action\CreateListAction;
use Domain\List\Models\Lists;
use Mockery\MockInterface;

use function Pest\Laravel\mock;

$makeSut = fn () => new class () {
    public readonly MockInterface|Lists $listModel;
    public readonly CreateListAction $action;

    public function __construct()
    {
        /** @var MockInterface|Lists */
        $this->listModel = mock(Lists::class);

        $this->action = new CreateListAction(
            $this->listModel,
        );
    }
};

$makeData = fn () => CreateListData::from([
    'name' =>  fake()->name(),
]);

it('should create list successfully', function () use ($makeSut, $makeData) {
    $sut = $makeSut();
    $data = $makeData();

    $sut->listModel->shouldReceive('create')->once();

    expect(fn () => $sut->action->execute($data))->not->toThrow();
});
