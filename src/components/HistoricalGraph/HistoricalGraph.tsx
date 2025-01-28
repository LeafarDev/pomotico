import { Legend, LegendItem, LegendLabel } from "@visx/legend";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
  BarSeries,
} from "@visx/xychart";
import { ReactElement } from "react";
import Modal from "react-modal";
import {
  HistoricalGraphDiv,
  TabsContainer,
  TabButton,
} from "./HistoricalGraphStyle";
import { useHistoricalGraph } from "../../hooks/useHistoricalGraph/useHistoricalGraph.ts";

export const HistoricalGraph = (): ReactElement => {
  const {
    isModalOpen,
    closeModal,
    activeTab,
    setActiveTab,
    adjustedMonthlyData,
    adjustedDailyData,
    profileColorScale,
    profiles,
    chartDimensions,
    isPhoneScreen,
  } = useHistoricalGraph();

  return (
    <HistoricalGraphDiv>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Historical Graph Modal"
        ariaHideApp={true}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div>
          <TabsContainer>
            <TabButton
              onClick={() => setActiveTab("months")}
              active={activeTab === "months"}
            >
              {isPhoneScreen ? "Últimos 6 meses" : "Últimos 12 meses"}
            </TabButton>
            <TabButton
              onClick={() => setActiveTab("days")}
              active={activeTab === "days"}
            >
              {isPhoneScreen ? "Últimos 5 dias" : "Últimos 12 dias"}
            </TabButton>
          </TabsContainer>
          {activeTab === "months" && (
            <XYChart
              xScale={{ type: "band" }}
              yScale={{ type: "linear" }}
              height={chartDimensions.height}
              width={chartDimensions.width}
            >
              <AnimatedGrid columns={false} numTicks={4} />
              <AnimatedAxis
                orientation="bottom"
                label={isPhoneScreen ? "Últimos 6 meses" : "Últimos 12 meses"}
              />
              <AnimatedAxis orientation="left" label="Focos finalizados" />

              {adjustedMonthlyData.map((profile, index) => (
                <AnimatedLineSeries
                  key={profile.id}
                  dataKey={profile.name}
                  data={profile.data}
                  xAccessor={(d) => d.x}
                  yAccessor={(d) => d.y}
                  stroke={profileColorScale(index)}
                />
              ))}

              <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showSeriesGlyphs
                renderTooltip={({ tooltipData }) => {
                  const datum = tooltipData?.nearestDatum?.datum as
                    | { x: number; y: number }
                    | undefined;
                  const key = tooltipData?.nearestDatum?.key;

                  if (datum) {
                    return (
                      <div>
                        <strong>Perfil:</strong> {key}
                        <br />
                        <strong>
                          {activeTab === "months" ? "Mês" : "Dia"}:
                        </strong>{" "}
                        {datum.x}
                        <br />
                        <strong>Quantia:</strong> {datum.y}
                      </div>
                    );
                  } else {
                    return null;
                  }
                }}
              />
            </XYChart>
          )}
          {activeTab === "days" && (
            <XYChart
              xScale={{ type: "band" }}
              yScale={{ type: "linear" }}
              height={chartDimensions.height}
              width={chartDimensions.width}
            >
              <AnimatedGrid columns={false} numTicks={4} />
              <AnimatedAxis
                orientation="bottom"
                label={isPhoneScreen ? "Últimos 5 dias" : "Últimos 12 dias"}
              />
              <AnimatedAxis orientation="left" label="Focos finalizados" />

              {adjustedDailyData.map((profile, index) => (
                <BarSeries
                  key={profile.id}
                  dataKey={profile.name}
                  data={profile.data}
                  xAccessor={(d) => d.x}
                  yAccessor={(d) => d.y}
                  colorAccessor={() => profileColorScale(index)}
                />
              ))}

              <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showSeriesGlyphs
                renderTooltip={({ tooltipData }) => {
                  const datum = tooltipData?.nearestDatum?.datum as
                    | { x: number; y: number }
                    | undefined;
                  const key = tooltipData?.nearestDatum?.key;

                  if (datum) {
                    return (
                      <div>
                        <strong>Perfil:</strong> {key}
                        <br />
                        <strong>Dia:</strong> {datum.x}
                        <br />
                        <strong>Quantia:</strong> {datum.y}
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <strong>Perfil:</strong> {key}
                        <br />
                        <strong>Dia:</strong> N/A
                        <br />
                        <strong>Quantia:</strong> N/A
                      </div>
                    );
                  }
                }}
              />
            </XYChart>
          )}

          <Legend scale={profileColorScale}>
            {() => (
              <>
                {profiles.map((profile, index) => (
                  <LegendItem key={profile.id}>
                    <svg width={15} height={15} style={{ marginRight: "8px" }}>
                      <circle
                        cx={7.5}
                        cy={7.5}
                        r={7.5}
                        fill={profileColorScale(index)}
                      />
                    </svg>
                    <LegendLabel>{profile.title}</LegendLabel>
                  </LegendItem>
                ))}
              </>
            )}
          </Legend>
        </div>
      </Modal>
    </HistoricalGraphDiv>
  );
};
